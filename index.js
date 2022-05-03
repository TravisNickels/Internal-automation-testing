const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const context = github.context.payload;
    const owner = core.getInput('repositoryOwner');
    const repository = core.getInput('repository');
    const octokit = github.getOctokit(
        core.getInput('repoToken', { required: true })
    );

    const issueComment = context.issue({
        body: "This is from the GHA",
    });

    await octokit.rest.issues.createComment(issueComment)
}