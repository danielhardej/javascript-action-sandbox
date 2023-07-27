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
  const joke = await getJoke();
  console.log(joke);
  core.setOutput("joke-output", joke);

  const context = github.context;
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

  await octokit.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    body: joke
  });
}

run();
