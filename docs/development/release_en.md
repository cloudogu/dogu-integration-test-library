# Release Process

to release a new version, do the following:
- merge your changes into develop via github PR
- on develop, execute `git flow release start x.x.x-x`
  - follow the steps of git flow
  - change version number in package.json
  - change version in CHANGELOG.md
- on develop and main, do `git push --tags`
- create GitHub release for the tag created by git flow
- publish on npmjs.org
  - note: you have to have an existing account and reside in the npmjs Cloudogu organization
  - call `npm adduser` and follow the CLI instructions
  - call `npm publish` and follow the CLI instructions