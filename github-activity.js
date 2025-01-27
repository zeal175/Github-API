const https = require('https');

// Function to fetch GitHub user activity
function fetchGitHubActivity(username) {
  const url = `https://api.github.com/users/${username}/events`;

  const options = {
    headers: {
      'User-Agent': 'node.js', // Required header for GitHub API
    },
  };

  https.get(url, options, (res) => {
    let data = '';

    // Debugging logs
    console.log(`API URL: ${url}`);
    console.log(`Response Status Code: ${res.statusCode}`);

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        try {
          const events = JSON.parse(data);

          if (events.length === 0) {
            console.log(`No recent activity found for user: ${username}`);
            return;
          }

          console.log(`Recent activity for GitHub user: ${username}`);
          events.slice(0, 5).forEach((event) => {
            switch (event.type) {
              case 'PushEvent':
                console.log(`- Pushed to ${event.repo.name}`);
                break;
              case 'IssuesEvent':
                console.log(`- ${event.payload.action} an issue in ${event.repo.name}`);
                break;
              case 'WatchEvent':
                console.log(`- Starred ${event.repo.name}`);
                break;
              case 'CreateEvent':
                console.log(`- Created ${event.repo.name}`);
                break;
              default:
                console.log(`- ${event.type} in ${event.repo.name}`);
            }
          });
        } catch (err) {
          console.error('Error parsing the API response:', err.message);
        }
      } else if (res.statusCode === 404) {
        console.error(
          `Error: User '${username}' not found or has no public activity.`
        );
      } else if (res.statusCode === 403) {
        console.error('Error: API rate limit exceeded. Try again later.');
      } else {
        console.error(`Error: Received ${res.statusCode} (${res.statusMessage}).`);
      }
    });
  }).on('error', (err) => {
    console.error('Error fetching data:', err.message);
  });
}

// Handle command-line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node github-activity.js <username>');
  process.exit(1);
}

const username = args[0];
console.log(`Fetching activity for GitHub user: ${username}`);
fetchGitHubActivity(username);
