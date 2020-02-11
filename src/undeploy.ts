import CONFIG from '@/config';
import { FunctionActions } from './types';
import { EventBus } from '@/event_bus';

export async function undeploy(function_name: string): Promise<string> {
  EventBus.$emit(FunctionActions.loading_start, true);
  const undeploy_url = `${CONFIG.api_url}/undeploy/${function_name}`;
  try {
    const data = await fetch(undeploy_url);
    const message = await data.text();
    console.log(message);
    EventBus.$emit(FunctionActions.refresh_list);
    return message;
  } catch (error) {
    console.error(error);
    EventBus.$emit(FunctionActions.loading_end, false);
    throw (error);
  }
}
