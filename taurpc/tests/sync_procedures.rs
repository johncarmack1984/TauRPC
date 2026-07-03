//! Sync procedures respond inline without going through the async runtime,
//! and can be mixed with async procedures in the same trait.

use serde_json::json;
use tauri::ipc::{CallbackFn, InvokeBody, InvokeResponseBody};
use tauri::test::{
    INVOKE_KEY, MockRuntime, get_ipc_response, mock_builder, mock_context, noop_assets,
};
use tauri::webview::InvokeRequest;

#[taurpc::procedures]
trait Api {
    fn sync_greet(name: String) -> String;

    fn sync_result(fail: bool) -> Result<String, String>;

    async fn async_greet(name: String) -> String;
}

#[derive(Clone)]
struct ApiImpl;

#[taurpc::resolvers]
impl Api for ApiImpl {
    fn sync_greet(self, name: String) -> String {
        format!("Hello, {name}!")
    }

    fn sync_result(self, fail: bool) -> Result<String, String> {
        if fail {
            Err("expected failure".to_string())
        } else {
            Ok("success".to_string())
        }
    }

    async fn async_greet(self, name: String) -> String {
        format!("Hello, {name}!")
    }
}

// Traits without any async methods should also work.
#[taurpc::procedures]
trait SyncOnly {
    fn ping() -> String;
}

#[derive(Clone)]
struct SyncOnlyImpl;

#[taurpc::resolvers]
impl SyncOnly for SyncOnlyImpl {
    fn ping(self) -> String {
        "pong".to_string()
    }
}

fn call<F>(
    handler: F,
    cmd: &str,
    body: serde_json::Value,
) -> Result<InvokeResponseBody, serde_json::Value>
where
    F: Fn(tauri::ipc::Invoke<MockRuntime>) -> bool + Send + Sync + 'static,
{
    let app = mock_builder()
        .invoke_handler(handler)
        .build(mock_context(noop_assets()))
        .unwrap();
    let webview = tauri::WebviewWindowBuilder::new(&app, "main", Default::default())
        .build()
        .unwrap();

    get_ipc_response(
        &webview,
        InvokeRequest {
            cmd: cmd.into(),
            callback: CallbackFn(0),
            error: CallbackFn(1),
            url: if cfg!(any(windows, target_os = "android")) {
                "http://tauri.localhost"
            } else {
                "tauri://localhost"
            }
            .parse()
            .unwrap(),
            body: InvokeBody::Json(body),
            headers: Default::default(),
            invoke_key: INVOKE_KEY.to_string(),
        },
    )
}

fn call_api(cmd: &str, body: serde_json::Value) -> Result<InvokeResponseBody, serde_json::Value> {
    call(
        taurpc::create_ipc_handler(ApiImpl.into_handler()),
        cmd,
        body,
    )
}

#[test]
fn sync_procedure_responds() {
    let response = call_api("TauRPC__sync_greet", json!({ "name": "world" })).unwrap();
    assert_eq!(response.deserialize::<String>().unwrap(), "Hello, world!");
}

#[test]
fn sync_procedure_result() {
    let response = call_api("TauRPC__sync_result", json!({ "fail": false })).unwrap();
    assert_eq!(response.deserialize::<String>().unwrap(), "success");

    let error = call_api("TauRPC__sync_result", json!({ "fail": true })).unwrap_err();
    assert_eq!(error, json!("expected failure"));
}

#[test]
fn async_procedure_still_responds() {
    let response = call_api("TauRPC__async_greet", json!({ "name": "world" })).unwrap();
    assert_eq!(response.deserialize::<String>().unwrap(), "Hello, world!");
}

#[test]
fn sync_only_trait_responds() {
    let response = call(
        taurpc::create_ipc_handler(SyncOnlyImpl.into_handler()),
        "TauRPC__ping",
        json!({}),
    )
    .unwrap();
    assert_eq!(response.deserialize::<String>().unwrap(), "pong");
}
