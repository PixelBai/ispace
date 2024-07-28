export class fileInfoBaseDto{
	id?:string      // unique identifier of the file
	name?:string      // base name of the file
	size?:number       // length in bytes for regular files; system-dependent for others
	mode?: number // file mode bits
	modTime?:Date   // modification time
	isDir?:boolean        // abbreviation for Mode().IsDir()
	sys:any         // underlying data source (can return nil)

}