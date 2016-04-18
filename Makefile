default: release

clean:
	rm -rf build
	rm -rf cache

release:
	node scripts/build-release.js

changelog:
	node scripts/generate-changelog.js

.PHONY:  default clean release changelog
.SILENT: default clean release changelog
