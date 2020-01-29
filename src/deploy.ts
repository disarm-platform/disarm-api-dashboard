import { CombinedRecord } from './types';
import CONFIG from './config';
import axios from 'axios';

export async function deploy(row: CombinedRecord) {
    interface DeployParams {
        service: string;
        image: string;
        envVars: any;
        labels: any;
        secrets: string[];
        use_stack_yml: boolean;
    }
    if (!row.target_image_version) {
        return;
    }
    let row_env_vars;
    try {
        row_env_vars = JSON.parse(row.env_vars);
    } catch (error) {
        row_env_vars = {};
    }
    let row_labels;
    try {
        row_labels = JSON.parse(row.labels);
    } catch (error) {
        row_labels = {};
    }
    let row_secrets;
    try {
        row_secrets = row.secrets.split(',');
    } catch (error) {
        row_secrets = [];
    }
    const deploy_params: DeployParams = {
        service: row.function_name,
        image: row.target_image_version,
        envVars: { ...CONFIG.default_deploy_params.envVars, ...row_env_vars },
        labels: { ...CONFIG.default_deploy_params.labels, ...row_labels },
        secrets: [...CONFIG.default_deploy_params.secrets, ...row_secrets],

    };
    const url = `${process.env.VUE_APP_API_URL || CONFIG.api_url}/deploy`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json, */*',
    };
    const data = JSON.stringify(deploy_params);
    axios.interceptors.request.use((r) => {
        // Do something before request is sent
        console.log(r);
        return r;
    }, (error) => {
        // Do something with request error
        console.log(error);
        return Promise.reject(error);
    });
    const request = await fetch(url, { method: 'POST', redirect: 'follow', body: data });
    console.log(request);
}
