# GitHub Activity CLI

A simple command-line interface (CLI) tool built with Node.js to fetch and display the recent public activity of a GitHub user using the GitHub API.

## Features
- Fetches the 5 most recent public activities of a specified GitHub user.
- Displays activity types such as:
  - Pushed commits
  - Opened issues
  - Starred repositories
  - Created repositories
- Handles errors gracefully:
  - Invalid usernames
  - No recent public activity
  - API rate limits

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.

## Installation
1. Clone or download this repository:
   ```bash
   git clone <https://github.com/zeal175/Github-API>
   cd github-activity-cli

#Usage
Run the script with the following command:
```bash
 node github-activity.js <username>
```
#Examples
Fetch Activity for a Valid User: node github-activity.js torvalds

Output: Fetching activity for GitHub user: torvalds Recent activity for GitHub user: torvalds

Pushed to torvalds/linux
Starred torvalds/linux
Handle Invalid Username: node github-activity.js invaliduser123

Output: Fetching activity for GitHub user: invaliduser123 Error: User 'invaliduser123' not found or has no public activity.

No Username Provided: node github-activity.js

Output: Usage: node github-activity.js <username>

#Error Handling

Invalid Username: Displays a message if the username is not found.
No Public Activity: Notifies the user if the GitHub user has no recent public activity.
API Rate Limit: Displays an error message if the GitHub API rate limit is exceeded.

#Limitations
Fetches only public activity.
Limited to the first 5 activities for simplicity.
Relies on GitHub API, which has a rate limit for unauthenticated requests (60 requests per hour).

#License
This project is licensed under the MIT License.
