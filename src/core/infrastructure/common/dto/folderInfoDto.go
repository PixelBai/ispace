package dto

import (
	"encoding/json"
	"fmt"
	"strconv"
)

type FolderInfoDto struct {
	FileInfoBaseDto
}

type FolderInfoDtoAlias FolderInfoDto

func (f FolderInfoDto) MarshalJSON() ([]byte, error) {
	return json.Marshal(&struct {
		FolderInfoDtoAlias
		Id string `json:"id"`
	}{
		FolderInfoDtoAlias: FolderInfoDtoAlias(f),
		Id:                 fmt.Sprintf("%d", f.Id),
	})
}

func (f *FolderInfoDto) UnmarshalJSON(data []byte) error {
	var alias struct {
		FolderInfoDtoAlias
		Id string `json:"id"`
	}
	if err := json.Unmarshal(data, &alias); err != nil {
		return err
	}

	id, err := strconv.ParseUint(alias.Id, 10, 64)
	if err != nil {
		return err
	}
	*f = FolderInfoDto(alias.FolderInfoDtoAlias)
	f.Id = id
	return nil
}
