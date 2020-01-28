#![no_std]
extern crate eng_wasm;
extern crate eng_wasm_derive;
extern crate ghost;
extern crate hex;
extern crate serde;
use eng_wasm::*;
use eng_wasm_derive::pub_interface;
use ghost::Ghost;
use std::collections::HashMap;

// Public struct Contract which will consist of private and public-facing secret contract functions
pub struct Contract;

const MEMO: &str = "MEMO";

// Public trait defining public-facing secret contract functions
#[pub_interface]
pub trait ContractInterface {
    fn registor(id: String, pass: String) -> bool;
    fn get_memo(id: String, pass: String) -> String;
    fn save_memo(id: String, pass: String, memo: String);
}

// Implementation of the public-facing secret contract functions defined in the ContractInterface
// trait implementation for the Contract struct above
impl ContractInterface for Contract {
    #[no_mangle]
    fn registor(id: String, pass: String) -> bool {
        Ghost::new().registor(id, pass).is_ok()
    }

    #[no_mangle]
    fn get_memo(id: String, pass: String) -> String {
        Ghost::new().authorize(id.clone(), pass).unwrap();
        let read: Option<HashMap<String, String>> = read_state!(MEMO);
        match read {
            Some(memos) => match memos.get(&id) {
                Some(v) => v.to_string(),
                None => "".to_string(),
            },
            None => "".to_string(),
        }
    }

    #[no_mangle]
    fn save_memo(id: String, pass: String, memo: String) {
        Ghost::new().authorize(id.clone(), pass).unwrap();
        let mut memos: HashMap<String, String> = read_state!(MEMO).unwrap_or(HashMap::new());
        if let Some(m) = memos.get_mut(&id) {
            *m = memo;
        } else {
            memos.insert(id, memo);
        }
        write_state!(MEMO => memos);
    }
}
