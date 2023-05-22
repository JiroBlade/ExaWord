// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs::File, io::Read};
use tauri::{api::dialog::blocking::FileDialogBuilder, Manager};
use window_shadows::set_shadow;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let main_window = app.get_window("main").unwrap();
      set_shadow(&main_window, true).unwrap();
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![open_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command(async)]
async fn open_file(win: tauri::Window) -> (String, bool) {
  let filepath = FileDialogBuilder::new()
    .set_parent(&win)
    .add_filter("XML file", &["xml"])
    .pick_file().unwrap_or_default();

  let mut buffer = String::new();
  let mut file_opened = false;

  if filepath.is_file() {
    let mut file = File::open(filepath).unwrap();
    
    file.read_to_string(&mut buffer).unwrap();
    file_opened = true;
  }
  (buffer, file_opened)
}