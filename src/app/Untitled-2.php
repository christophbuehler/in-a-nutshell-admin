<?php

error_reporting(E_ALL);

// Check if image file is an actual image.
$check = getimagesize($_FILES['fileToUpload']['tmp_name']);
if ($check !== false) {
    echo 'File is an image - ' . $check['mime'] . '.';
} else {
    echo 'File is not an image.';
    exit;
}

// Check if file already exists.
$index = 0;
do {
  $target_file = get_file_name($index);
  $index++;
} while (file_exists($target_file));

echo 'target_file' . $target_file;

// Check file size.
if ($_FILES['fileToUpload']['size'] > 500000) {
    echo 'Sorry, your file is too large.';
    exit;
}

if (move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $target_file)) {
    echo 'The file '. basename( $_FILES['fileToUpload']['name']). ' has been uploaded.';
} else {
    echo 'Sorry, there was an error uploading your file.';
}

function get_file_name($index) {
  $pathInfo = pathinfo($_FILES['fileToUpload']['name']);
  $fileName = $pathInfo['filename'] . ($index == 0 ? '' : $index);
  $extension = strtolower($pathInfo['extension']);
  $target_dir = __DIR__ . '/assets/';
  if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
  }
  return $target_dir . $fileName . '.' . $extension;
}
