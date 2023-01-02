#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::{fs::{File, write}, io::{Read, BufWriter, Write}, path::PathBuf};
use tauri::api::dialog::blocking::FileDialogBuilder;
//use zip::ZipArchive;
use serde::{Serialize, Deserialize};
use serde_json::{Value as JsonValue, from_reader};

#[derive(Serialize, Deserialize, Debug)]
pub struct Project {
  paragraphs: Vec<String>
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![save_json, open_json, read_json, save_xml, open_xml])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command(async)]
async fn save_json(win: tauri::Window, path: PathBuf, data: Vec<String>) {
  match path.is_file() {
    false => {
      let file_path = FileDialogBuilder::new()
        .set_parent(&win)
        .save_file().unwrap_or_default();

      if file_path.is_file() {
        let mut file = File::create(file_path).unwrap();
        let project = Project {
          paragraphs: data
        };

        let buffer = serde_json::to_string_pretty(&project).unwrap();
        file.write_all(buffer.as_bytes()).unwrap();
      }
    },
    true => {
      let mut file = File::create(path).unwrap();
      let project = Project {
        paragraphs: data
      };
      
      let buffer = serde_json::to_string_pretty(&project).unwrap();
      file.write_all(buffer.as_bytes()).unwrap();
    }
  }
}

#[tauri::command(async)]
async fn open_json(win: tauri::Window) -> PathBuf {
  let file_path = FileDialogBuilder::new()
    .set_parent(&win)
    .add_filter("JSON File", &["json"])
    .pick_file().unwrap_or_default();

  file_path
}

#[tauri::command]
fn read_json(path: PathBuf) -> Project {
  let file = File::open(path).unwrap();
  let project: Project = from_reader(file).unwrap();
  project
}

#[tauri::command(async)]
async fn save_xml(path: PathBuf) {
  println!("{:?}", path);
}

#[tauri::command(async)]
async fn open_xml(win: tauri::Window) -> (PathBuf, String) {
  let file_path = FileDialogBuilder::new()
    .set_parent(&win)
    .add_filter("XML File", &["xml"])
    .pick_file().unwrap_or_default();

  let mut buffer = String::new();

  if file_path.is_file() {
    let mut file = File::open(&file_path).unwrap();
    file.read_to_string(&mut buffer).unwrap();
  }

  (file_path, buffer)
}