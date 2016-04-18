app:
	node build/generate.js

clean:
	rm -rf build/release
	rm -rf build/.nw-cache

.PHONY:  app clean
.SILENT: app clean
