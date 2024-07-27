package dto

import (
	"io/fs"
	"time"
)

type FileInfoBaseDto struct {
	Name    string      `json:"name"`  // base name of the file
	Size    int64       `json:"size"`  // length in bytes for regular files; system-dependent for others
	Mode    fs.FileMode `json:"mode"`  // file mode bits
	ModTime time.Time   `json:"mtime"` // modification time
	IsDir   bool        `json:"isdir"` // abbreviation for Mode().IsDir()        // abbreviation for Mode().IsDir()
	Sys     any         `json:"sys"`   // underlying data source (can return nil)        // underlying data source (can return nil)

}
