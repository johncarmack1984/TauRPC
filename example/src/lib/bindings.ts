// My header
// This file has been generated by Specta. DO NOT EDIT.

export type TauRpcApiInputTypes =
  | { proc_name: 'update_state'; input_type: { __taurpc_type: string } }
  | { proc_name: 'get_window'; input_type: null }
  | { proc_name: 'get_app_handle'; input_type: null }
  | { proc_name: 'test_io'; input_type: { __taurpc_type: User } }
  | { proc_name: 'test_option'; input_type: null }
  | { proc_name: 'test_result'; input_type: { __taurpc_type: User } }
  | { proc_name: 'with_sleep'; input_type: null }
  | { proc_name: 'method_with_alias'; input_type: null }
  | { proc_name: 'ev'; input_type: { __taurpc_type: string } }
  | { proc_name: 'vec_test'; input_type: { __taurpc_type: string[] } }
  | { proc_name: 'multiple_args'; input_type: [string[], string] }
  | { proc_name: 'test_bigint'; input_type: { __taurpc_type: bigint } }

export type TauRpcApiOutputTypes =
  | { proc_name: 'update_state'; output_type: null }
  | { proc_name: 'get_window'; output_type: null }
  | { proc_name: 'get_app_handle'; output_type: null }
  | { proc_name: 'test_io'; output_type: User }
  | { proc_name: 'test_option'; output_type: null | null }
  | { proc_name: 'test_result'; output_type: User }
  | { proc_name: 'with_sleep'; output_type: null }
  | { proc_name: 'method_with_alias'; output_type: null }
  | { proc_name: 'ev'; output_type: null }
  | { proc_name: 'vec_test'; output_type: null }
  | { proc_name: 'multiple_args'; output_type: null }
  | { proc_name: 'test_bigint'; output_type: bigint }

export type TauRpcEventsInputTypes =
  | { proc_name: 'test_ev'; input_type: null }
  | { proc_name: 'state_changed'; input_type: { __taurpc_type: string } }
  | { proc_name: 'vec_test'; input_type: { __taurpc_type: string[] } }
  | { proc_name: 'multiple_args'; input_type: [number, string[]] }

export type TauRpcEventsOutputTypes =
  | { proc_name: 'test_ev'; output_type: null }
  | { proc_name: 'state_changed'; output_type: null }
  | { proc_name: 'vec_test'; output_type: null }
  | { proc_name: 'multiple_args'; output_type: null }

export type TauRpcUiApiInputTypes =
  | { proc_name: 'trigger'; input_type: null }
  | { proc_name: 'test_ev'; input_type: null }

export type TauRpcUiApiOutputTypes =
  | { proc_name: 'trigger'; output_type: null }
  | { proc_name: 'test_ev'; output_type: null }

/**
 * Doc comments are also generated
 */
export type User = {
  /**
   * The user's id
   */
  uid: number
  /**
   * The user's first name
   */
  first_name: string
  /**
   * The user's last name
   */
  last_name: string
}

const ARGS_MAP = {
  'events':
    '{"test_ev":[],"vec_test":["args"],"multiple_args":["arg1","arg2"],"state_changed":["new_state"]}',
  'api.ui': '{"test_ev":[],"trigger":[]}',
  '':
    '{"test_io":["user"],"multiple_args":["arg","arg2"],"method_with_alias":[],"ev":["updated_value"],"test_option":[],"vec_test":["arg"],"test_bigint":["num"],"with_sleep":[],"update_state":["new_value"],"get_window":[],"test_result":["user"],"get_app_handle":[]}',
}
import { createTauRPCProxy as createProxy } from 'taurpc'

export const createTauRPCProxy = () => createProxy<Router>(ARGS_MAP)

type Router = {
  '': [TauRpcApiInputTypes, TauRpcApiOutputTypes]
  'events': [TauRpcEventsInputTypes, TauRpcEventsOutputTypes]
  'api.ui': [TauRpcUiApiInputTypes, TauRpcUiApiOutputTypes]
}
