package dto

import (
	"encoding/json"
	"fmt"
	"io/fs"
	"strconv"
	"time"
)

type FileInfoBaseDto struct {
	Id      uint64      `json:"id"`      // base id of the file
	Name    string      `json:"name"`    // base name of the file
	Size    int64       `json:"size"`    // length in bytes for regular files; system-dependent for others
	Mode    fs.FileMode `json:"mode"`    // file mode bits
	ModTime time.Time   `json:"modTime"` // modification time
	IsDir   bool        `json:"isDir"`   // abbreviation for Mode().IsDir()        // abbreviation for Mode().IsDir()
	Sys     any         `json:"sys"`     // underlying data source (can return nil)        // underlying data source (can return nil)

}

type fileInfoBaseDtoAlias FileInfoBaseDto

func (f FileInfoBaseDto) MarshalJSON() ([]byte, error) {
	return json.Marshal(&struct {
		fileInfoBaseDtoAlias
		Id string `json:"id"`
	}{
		fileInfoBaseDtoAlias: fileInfoBaseDtoAlias(f),
		Id:                   fmt.Sprintf("%d", f.Id),
	})
}

func (f *FileInfoBaseDto) UnmarshalJSON(data []byte) error {
	var alias struct {
		fileInfoBaseDtoAlias
		Id string `json:"id"`
	}
	if err := json.Unmarshal(data, &alias); err != nil {
		return err
	}

	id, err := strconv.ParseUint(alias.Id, 10, 64)
	if err != nil {
		return err
	}
	*f = FileInfoBaseDto(alias.fileInfoBaseDtoAlias)
	f.Id = id
	return nil
}
