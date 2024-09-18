# Release Process

to release a new version, do the following:
- merge your changes into develop via github PR
- on develop, execute `git flow release start x.x.x-x`
  - follow the steps of git flow
  - change version number in package.json
  - change version in CHANGELOG.md
- on develop and main, do `git push --tags`
- create GitHub release for the tag created by git flow