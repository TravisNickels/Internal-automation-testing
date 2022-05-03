const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const context = github.context;
    const owner = core.getInput('repositoryOwner');
    const repository = core.getInput('repository');
    const octokit = github.getOctokit(
        core.getInput('repoToken', { required: true })
    );

    console.log.info("I see the issue_comment.created");

    const issueComment = context.issue({
        body: "This is from the GHA",
    });

    await octokit.rest.issues.createComment(issueComment)
}