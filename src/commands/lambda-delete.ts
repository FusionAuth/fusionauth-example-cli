import {Command} from 'commander';
import {FusionAuthClient} from '@fusionauth/typescript-client';
import chalk from 'chalk';
import * as types from '../types.js';
import * as util from '../utils.js';

const action = async function (lambdaId: string, clioptions: types.CLILambdaOptions) {
    const options = util.validateLambdaOptions(clioptions);
    console.log(`Deleting lambda ${lambdaId} from ${options.host}`);
    try {
        const fusionAuthClient = new FusionAuthClient(options.apiKey, options.host);
        const clientResponse = await fusionAuthClient.deleteLambda(lambdaId);
        if (!clientResponse.wasSuccessful())
            util.errorAndExit(`Error deleting lamba: `, clientResponse);
        console.log(chalk.green(`Lambda deleted`));
    }
    catch (e: unknown) {
        util.errorAndExit(`Error deleting lamba: `, e);
    }
}

export const lambdaDelete = new Command('lambda:delete')
    .description('Delete a lambda from FusionAuth')
    .argument('<lambdaId>', 'The lambda id to delete')
    .option('-k, --key <key>', 'The API key to use')
    .option('-h, --host <url>', 'The FusionAuth host to use', 'http://localhost:9011')
    .action(action);
