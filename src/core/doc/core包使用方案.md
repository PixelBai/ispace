使用 npm link
1. 在本地包目录下
首先，进入你正在开发的本地包（我们称之为my-local-package）的根目录，运行npm link。这会将你的包链接到全局的npm包目录中，这样你就可以在任何地方通过require或import来引用它了。

bash
cd path/to/my-local-package  
npm link
2. 在使用本地包的项目中
然后，进入你正在开发的项目目录，运行npm link my-local-package（这里的my-local-package是你本地包的名称，注意它可能与你项目目录中的文件夹名称不完全相同，具体取决于package.json中的name字段）。这会在你的项目node_modules目录中创建一个指向全局链接的符号链接，这样你就可以像使用其他npm包一样使用它了。

bash
cd path/to/my-project  
npm link my-local-package
