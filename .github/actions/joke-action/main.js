// const getJoke = require("./joke");
// const core = require("@actions/core");

// async function run() {
//   const joke = await getJoke();
//   console.log(joke);
//   core.setOutput("joke-output", joke);
// }

const getJoke = require("./joke");
const core = require("@actions/core");
const github = require("@actions/github");
const { context } = github.context;
const token = core.getInput('GITHUB_TOKEN');
// const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
const octokit = new github.getOctokit(token);
const owner = core.getInput('owner');
const repo = core.getInput('repo');
const issue_number = core.getInput('issue_number');

async function run() {

  const joke = await getJoke();
  console.log(joke);
  core.setOutput("joke-output", joke);

  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number,
    body: `Thank you for adding a label! We will try to review this as soon as we can.`
  });
}

run();
