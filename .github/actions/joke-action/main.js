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

async function run() {

  const token = core.getInput('GITHUB_TOKEN', { required: true });
  const context = github.context;
  // const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
  const octokit = new github.getOctokit(token);

  const joke = await getJoke();
  console.log(joke);
  core.setOutput("joke-output", joke);

  await octokit.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    body: joke
  });
}

run();
