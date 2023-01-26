#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::{fs::File, io::Write};
use tauri::{api::dialog::blocking::FileDialogBuilder, Manager};
use windows::{core::*, Data::Xml::Dom::*, Foundation::*, Storage::*};

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let main_window = app.get_window("main").unwrap();
      main_window.set_decorations(false).unwrap();
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![save_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command(async)]
async fn save_file(win: tauri::Window, contents: Vec<String>) {
  let filepath = FileDialogBuilder::new()
    .set_parent(&win)
    .add_filter("Word Document", &["xml"])
    .save_file().unwrap_or_default();

  if filepath.capacity() != 0 {
    let file = File::create(filepath).unwrap();

    xml(file).unwrap();
  }
}

fn xml<W: Write>(mut w: W) -> Result<()> {
  let doc = XmlDocument::new()?;
  let root = doc.CreateElement(h!("root"))?;
  
  
  
  
  w.write_all(doc.GetXml().unwrap().to_string().as_bytes()).unwrap();

  Ok(())
}