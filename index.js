const core = require('@actions/core');
const github = require('@actions/github');

console.log("before run");

async function run() {
    console.log("before context");
    const context = github.context;
    const owner = core.getInput('repositoryOwner');
    console.log("owner: " + owner);
    const repository = core.getInput('repository');
    console.log("repository: " + repository);
    const octokit = github.getOctokit(
        core.getInput('repoToken', { required: true })
    );

    console.log("I see the issue_comment.created");

    const issueComment = context.issue({
        body: "This is from the GHA",
    });

    await octokit.rest.issues.createComment(issueComment)
}