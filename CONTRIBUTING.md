# Contributing

## first-timers-only


Issues tagged with `first-timers-only` should only be completed by someone who has never contributed to an open source project before. 
The purpose of this is to encourage and help more people learn how to contribute. See https://medium.com/@kentcdodds/first-timers-only-78281ea47455 for more details.


## Questions/Help

If you have a question you can:

1. Tweet at one of our team members ([@brandonbeeks](http://twitter.com/brandonbeeks), [@jmophoto](http://twitter.com/jmophoto), [@tommy_dugger](http://twitter.com/tommy_dugger))
2. File an issue with a question

## Reporting Bugs / Requesting Features

If you've found an issue, please submit it in [the issues](https://github.com/mxenabled/mx-react-components/issues). Please include the following:

1. OS and Browser with specified versions
2. Steps to reproduce the issue
3. Example code snippet that causes the issue (optional)
4. Screenshots of the broken UI

## Pull Requests

If you would like to add functionality, please submit [an issue](https://github.com/mx-react-components/issues)
first to make sure it's a direction we want to take. We also include issues tagged with `new feature` that you can
request to work on.

When submitting a PR, please include the following:
* Be sure you code passes our ESLint rules by running `eslint src`. Our Travis CI integration will also run your PR through the linter.
* Provide a details explanation of what the changes are fixing/adding. If you are adding a new component, please provide descriptions for each
propType. Your PR should look similar to [this](https://github.com/mxenabled/mx-react-components/pull/17).
* Update the demo files to reflect your changes.

### Development

1. Fork the repo.
2. run `npm install`. You may need to install some modules like babel and esw globally if you want access to their cli's.
3. run `npm run demo`. We've set up a demo page with all of the components to help test your changes. We've even included live reload to make your life a little easier.
4. Commit your changes. You should only need to edit the files in the "src" directory. We encourage small and frequent commits with descriptive commit messages.
5. run `eslint src`. Before you create a PR, make sure it passes ESLint.
6. Submit a PR.
7. Someone from our team will review the changes and either request edits or merge it in.
