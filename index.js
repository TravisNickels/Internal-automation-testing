const core = require('@actions/core');
const github = require('@actions/github');

console.log("before run");

function getIssueProps(context) {
    return {
        owner: context.repository.owner,
        repo: context.repository.name,
        issue_number: context.issue.number,
    };
}
  
function createComment(octokit, context, body) {
    return octokit.rest.issues.createComment({
        ...getIssueProps(context),
        body,
    });
}

async function run() {
    const context = github.context.payload;
    const owner = core.getInput('repositoryOwner');
    const repository = core.getInput('repository');
    const octokit = github.getOctokit(
        core.getInput('repoToken', { required: true })
    );

    context.repository = {
        owner,
        name: repository.split('/')[1],
    };

    console.log("I see the issue_comment.created");

    // await createComment(
    //     octokit,
    //     context,
    //     "I see the comment you made!"
    // );

    await octokit.rest.issues.createComment({
        owner: context.repository.owner,
        repo: context.repository.name,
        issue_number: context.issue.number,
        body: "I got the comment on the issue! ✅"
    })
    //await octokit.rest.issues.createComment(issueComment)
}

run();