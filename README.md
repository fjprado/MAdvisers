# M-Advisers

## Overview

The M-Advisers is a web application that allows users to manage the technical service by checking in, writing reports, and registering expenses.

## Features

- **Check-in:** Easily check in and check out.
- **Reports:** Generate reports with check-in and check-out plus diary log.
- **Expenses:** Add diary expenses.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/fjprado/m-advisers.git
    ```

2. Navigate to the project directory:

    ```bash
    cd m-advisers
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Install json-server:

   ```bash
    npm install -g json-server
    ```

5. Install nodemon:

   ```bash
    npm install -g nodemon
    ```

### Usage

1. Start the application:

    ```bash
    tsc --watch backend/tsconfig.json
    nodemon --watch backend backend/dist/server.js
    ```
2. Open your web browser and go to [http://localhost:4200](http://localhost:4200).

## Technologies Used

- Angular 6: Frontend framework

## Contributing

If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Feel free to contact us if you have any questions or issues!
