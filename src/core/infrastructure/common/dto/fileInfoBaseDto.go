package dto

import (
	"io/fs"
	"time"
)

type FileInfoBaseDto struct {
	Name    string      // base name of the file
	Size    int64       // length in bytes for regular files; system-dependent for others
	Mode    fs.FileMode // file mode bits
	ModTime time.Time   // modification time
	IsDir   bool        // abbreviation for Mode().IsDir()
	Sys     any         // underlying data source (can return nil)

}
