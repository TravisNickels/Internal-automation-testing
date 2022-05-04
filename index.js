const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        if (!isPost) {
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

            console.log("Creating the comment");

            await octokit.rest.issues.createComment({
                owner: context.repository.owner,
                repo: context.repository.name,
                issue_number: context.issue.number,
                body: "I got the comment on the issue! ✅"
            })
        } else { // Cleanup
            console.log("Running cleanup");
        }
    } catch (err) {
        core.setFailed(err);
        console.log(err);
    } 
}

run();