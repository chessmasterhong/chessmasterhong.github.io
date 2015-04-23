# chessmasterhong.github.io

This is the source code for my website at [http://chessmasterhong.github.io](http://chessmasterhong.github.io).


## Development

### Requirements

1. [Node.js](https://nodejs.org/) (and npm)
2. [Bower](http://bower.io/) installed globally<br>
    `npm install -g bower`

### Setup

1. Obtain the repository files (choose a method)
    1. Clone via HTTPS<br>
        `git clone https://github.com/chessmasterhong/chessmasterhong.github.io.git`
    2. Clone via SSH<br>
        `git clone git@github.com:chessmasterhong/chessmasterhong.github.io.git`
    3. Download and extract the files<br>
        `https://github.com/chessmasterhong/chessmasterhong.github.io/archive/master.zip`
2. Change directory into newly obtained repository's root directory<br>
    `cd chessmasterhong.github.io`
3. Install development packages<br>
    `npm install`
4. Install distribution packages<br>
    `bower install`

### Usage

1. Build project from source (must be done the first time the project is set up; any time after that is optional but preferred)<br>
    `npm run build`
2. Serve project and monitor changes to source files (will automatically rebuild on change)<br>
    `npm run serve`
3. When (re)build finishes, view built site in web browser<br>
    `http://127.0.0.1:8080/`
4. Modify source files and refresh browser to see updated changes


## License

See [LICENSE.md](LICENSE.md).
