// My header

// This file has been generated by Specta. DO NOT EDIT.

import {
  createTauRPCProxy as createProxy,
  type InferCommandOutput,
} from 'taurpc'
type TAURI_CHANNEL<T> = (t: T) => void

export type Error = { type: 'Io' } | { type: 'Other'; data: string }

export type Update = { progress: number }

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
  'api.ui': '{"test_ev":[],"trigger":[]}',
  'events':
    '{"vec_test":["args"],"state_changed":["new_state"],"multiple_args":["arg1","arg2"],"test_ev":[]}',
  '': '{"update_state":["new_value"],"get_webview_window":[],"with_sleep":[],"get_app_handle":[],"vec_test":["arg"],"ev":["updated_value"],"multiple_args":["arg","arg2"],"test_bigint":["num"],"with_channel":["on_event"],"method_with_alias":[],"test_result":["user"],"get_window":[],"test_io":["_user"],"test_option":[]}',
}
export type Router = {
  'api.ui': { trigger: () => Promise<void>; test_ev: () => Promise<void> }
  '': {
    update_state: (newValue: string) => Promise<void>
    get_window: () => Promise<void>
    get_webview_window: () => Promise<void>
    get_app_handle: () => Promise<void>
    test_io: (user: User) => Promise<User>
    test_option: () => Promise<null | null>
    test_result: (user: User) => Promise<User>
    with_sleep: () => Promise<void>
    method_with_alias: () => Promise<void>
    ev: (updatedValue: string) => Promise<void>
    vec_test: (arg: string[]) => Promise<void>
    multiple_args: (arg: string[], arg2: string) => Promise<void>
    test_bigint: (num: string) => Promise<string>
    with_channel: (onEvent: TAURI_CHANNEL<Update>) => Promise<void>
  }
  'events': {
    test_ev: () => Promise<void>
    state_changed: (newState: string) => Promise<void>
    vec_test: (args: string[]) => Promise<void>
    multiple_args: (arg1: number, arg2: string[]) => Promise<void>
  }
}

export type { InferCommandOutput }
export const createTauRPCProxy = () => createProxy<Router>(ARGS_MAP)
