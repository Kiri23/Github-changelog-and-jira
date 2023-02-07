// import github 
// fetch changelog from github 
// parse changelo - get ticket number 
// send ticket number to Jira to transaction the issue
const github = require("./github")
const jira = require("./jira")
const changelogParser = require("./changelog")

const main = async (githubMeta, jiraMeta) => {
    const octokit = github.setToken(githubMeta.token)
    const changelog = await github.getChangelog(octokit, githubMeta)
    console.log(changelog + "\n");

    const parsedChangelog = await changelogParser.parse(changelog)
    console.log(parsedChangelog);

    const jiraInstance = jira.configureJira(jiraMeta)
    jira.updateTicketSummary("PPA-2", jiraInstance)
} 

(async () => {
    const dotenv = require('dotenv');
    dotenv.config();
    // process.env.JIRA_TOKEN

    const githubMeta = {
        token: process.env.GITHUB_TOKEN, 
        owner: "Kiri23", 
        repo: "testRepo",
        path: "readme.md"
        }
    const jiraMeta = {
        instanceURL: "https://Kiri23.atlassian.net/",
        username: "christian_nogueras94@hotmail.com",
        token: process.env.JIRA_TOKEN
    }
    main(githubMeta, jiraMeta);
})();
