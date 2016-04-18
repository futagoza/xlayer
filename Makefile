default: app

clean:
	rm -rf build/release
	rm -rf build/.nw-cache

app:
	node scripts/build-app.js

changelog:
	node scripts/generate-changelog.js

.PHONY:  default clean app changelog
.SILENT: default clean app changelog
