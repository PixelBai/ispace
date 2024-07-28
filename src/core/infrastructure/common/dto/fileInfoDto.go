package dto

import (
	"encoding/json"
	"fmt"
	"strconv"
)

type FileInfoDto struct {
	FileInfoBaseDto
}

type FileInfoDtoAlias FileInfoDto

func (f FileInfoDto) MarshalJSON() ([]byte, error) {
	return json.Marshal(&struct {
		FileInfoDtoAlias
		Id string `json:"id"`
	}{
		FileInfoDtoAlias: FileInfoDtoAlias(f),
		Id:               fmt.Sprintf("%d", f.Id),
	})
}

func (f *FileInfoDto) UnmarshalJSON(data []byte) error {
	var alias struct {
		FileInfoDtoAlias
		Id string `json:"id"`
	}
	if err := json.Unmarshal(data, &alias); err != nil {
		return err
	}

	id, err := strconv.ParseUint(alias.Id, 10, 64)
	if err != nil {
		return err
	}
	*f = FileInfoDto(alias.FileInfoDtoAlias)
	f.Id = id
	return nil
}
