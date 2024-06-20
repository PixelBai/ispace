# Makefile

# TypeScript compiler
TSC = ./node_modules/.bin/tsc

# Source and distribution directories
SRC_DIR = src
DIST_DIR = dist

# TypeScript files
TS_FILES = $(wildcard $(SRC_DIR)/*.ts)

# JavaScript files to be generated
JS_FILES = $(patsubst $(SRC_DIR)/%.ts,$(DIST_DIR)/%.js,$(TS_FILES))

# Default target
all: $(JS_FILES)

# Rule to compile TypeScript files
$(DIST_DIR)/%.js: $(SRC_DIR)/%.ts
	$(TSC)

# Clean target to remove generated files
clean:
	rm -rf $(DIST_DIR)/*.js

# Watch target to monitor changes and recompile
watch:
	@while true; do \
		$(MAKE) --silent; \
		inotifywait -e modify,create,delete -r $(SRC_DIR); \
	done
