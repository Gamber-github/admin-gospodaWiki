<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">ADMIN-GOSPODAWIKI</h1>
</p>
<p align="center">
    <em>GospodaWiki all what you need</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/Gamber-github/admin-gospodaWiki?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/Gamber-github/admin-gospodaWiki?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Gamber-github/admin-gospodaWiki?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Gamber-github/admin-gospodaWiki?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/styledcomponents-DB7093.svg?style=flat&logo=styled-components&logoColor=white" alt="styledcomponents">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#-overview)
> - [📦 Features](#-features)
> - [📂 Repository Structure](#-repository-structure)
> - [🧩 Modules](#-modules)
> - [🛠 Project Roadmap](#-project-roadmap)
> - [🤝 Contributing](#-contributing)
> - [📄 License](#-license)
> - [👏 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

Admin-Gospodawiki is an administrator panel designed to manage and fill out data for the GospodaWiki application. This panel provides a user-friendly interface for administrators to interact with various data entities such as characters, items, players, and more. The application is built using modern web technologies including React, TypeScript, and Vite, ensuring a fast and responsive user experience.

Key Features:

- Authentication: Secure login functionality to ensure only authorized users can access the admin panel.
- Data Management: CRUD operations for managing characters, items, players, and other entities.
- API Integration: Seamless connection to the backend API for data retrieval and manipulation.
- Responsive Design: Optimized for various devices to provide a consistent user experience.
- Error Handling: Proper handling of HTTP errors, including 401 Unauthorized errors.

Technologies Used:

- React: For building the user interface.
- TypeScript: For type-safe JavaScript development.
- Vite: For fast and efficient development and build processes.
- Styled-Components: For styling the application components.
- ESLint: For maintaining code quality and consistency.

---

## 📦 Features

Admin-Gospodawiki offers a comprehensive set of features designed to facilitate the management of the GospodaWiki application. Below are the key features:

- **Authentication**: Ensures that only authorized users can access the admin panel, providing a secure environment for data management.
- **Data Management**: Provides CRUD (Create, Read, Update, Delete) operations for managing various entities such as characters, items, players, and more. This allows administrators to efficiently handle the data within the GospodaWiki application.
- **API Integration**: Seamlessly connects to the backend API for data retrieval and manipulation. This ensures that the admin panel is always in sync with the latest data from the server.
- **Responsive Design**: Optimized for various devices, ensuring a consistent and user-friendly experience whether accessed from a desktop, tablet, or mobile device.
- **Error Handling**: Properly handles HTTP errors, including 401 Unauthorized errors, to provide clear feedback to the user and maintain the integrity of the application.
  These features collectively ensure that the admin panel is robust, user-friendly, and secure, making it an essential tool for managing the GospodaWiki application.

---

## 📂 Repository Structure

```sh
└── admin-gospodaWiki/
    ├── README.md
    ├── index.html
    ├── package.json
    ├── pnpm-lock.yaml
    ├── LICENCE
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.tsx
    │   ├── api
    │   │   ├── authenticate.tsx
    │   │   ├── characters.tsx
    │   │   ├── items.tsx
    │   │   ├── players.tsx
    │   │   ├── rpgSystems.tsx
    │   │   ├── series.tsx
    │   │   ├── tags.tsx
    │   │   └── utils
    │   │       ├── ResponseSchema
    │   │       │   └── responseSchemas.tsx
    │   │       ├── api.tsx
    │   │       └── types.tsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   ├── AsyncHelper
    │   │   │   └── StatusAsyncHelper.tsx
    │   │   ├── Characters
    │   │   │   ├── CharacterDetails.tsx
    │   │   │   ├── CharactersTable.tsx
    │   │   │   ├── EditCharacterForm.tsx
    │   │   │   └── NewCharacterForm.tsx
    │   │   ├── Login
    │   │   │   └── LoginComponent.tsx
    │   │   ├── Players
    │   │   │   ├── EditPlayerForm.tsx
    │   │   │   ├── NewPlayerForm.tsx
    │   │   │   ├── PlayerDetails.tsx
    │   │   │   └── PlayersTable.tsx
    │   │   ├── Sidebar
    │   │   │   └── Sidebar.tsx
    │   │   ├── Sidebar.tsx
    │   │   ├── UI
    │   │   │   ├── Buttons
    │   │   │   │   └── DeleteButton.tsx
    │   │   │   ├── CustomStyles
    │   │   │   │   └── CustomStyles.tsx
    │   │   │   ├── Select
    │   │   │   │   ├── CustomSelection.tsx
    │   │   │   │   └── RpgSystemSelection.tsx
    │   │   │   └── Spinner
    │   │   │       └── Spinner.tsx
    │   │   ├── WhiteTile
    │   │   │   └── WhiteTile.tsx
    │   │   └── helpers.tsx
    │   ├── hooks
    │   │   ├── useModalProps.tsx
    │   │   ├── usePageParams.tsx
    │   │   └── usePersistedState.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   ├── pages
    │   │   ├── Character
    │   │   │   ├── CharacterEdit.tsx
    │   │   │   └── Characters.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── Error404.tsx
    │   │   ├── Login.tsx
    │   │   └── Player
    │   │       ├── PlayerEdit.tsx
    │   │       └── Players.tsx
    │   ├── routes
    │   │   ├── PrivateRoute.tsx
    │   │   ├── PublicRoute.tsx
    │   │   ├── layouts
    │   │   │   └── DefaultLayout.tsx
    │   │   └── router.tsx
    │   ├── store
    │   │   ├── AuthUserProvider.tsx
    │   │   └── TokenManager.tsx
    │   ├── utils
    │   │   ├── domain.tsx
    │   │   └── object.tsx
    │   └── vite-env.d.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

---

## 🧩 Modules

<details closed><summary>.</summary>

| File                                                                                                    | Summary                                        |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [tsconfig.json](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/tsconfig.json)           | HTTP error 401 for prompt `tsconfig.json`      |
| [index.html](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/index.html)                 | HTTP error 401 for prompt `index.html`         |
| [tsconfig.app.json](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/tsconfig.app.json)   | HTTP error 401 for prompt `tsconfig.app.json`  |
| [vite.config.ts](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/vite.config.ts)         | HTTP error 401 for prompt `vite.config.ts`     |
| [package.json](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/package.json)             | HTTP error 401 for prompt `package.json`       |
| [tsconfig.node.json](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/tsconfig.node.json) | HTTP error 401 for prompt `tsconfig.node.json` |
| [pnpm-lock.yaml](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/pnpm-lock.yaml)         | HTTP error 401 for prompt `pnpm-lock.yaml`     |

</details>

<details closed><summary>src</summary>

| File                                                                                              | Summary                                       |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [main.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/main.tsx)           | HTTP error 401 for prompt `src/main.tsx`      |
| [vite-env.d.ts](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/vite-env.d.ts) | HTTP error 401 for prompt `src/vite-env.d.ts` |
| [App.css](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/App.css)             | HTTP error 401 for prompt `src/App.css`       |
| [App.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/App.tsx)             | HTTP error 401 for prompt `src/App.tsx`       |
| [index.css](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/index.css)         | HTTP error 401 for prompt `src/index.css`     |

</details>

<details closed><summary>src.store</summary>

| File                                                                                                                  | Summary                                                    |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [TokenManager.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/store/TokenManager.tsx)         | HTTP error 401 for prompt `src/store/TokenManager.tsx`     |
| [AuthUserProvider.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/store/AuthUserProvider.tsx) | HTTP error 401 for prompt `src/store/AuthUserProvider.tsx` |

</details>

<details closed><summary>src.utils</summary>

| File                                                                                              | Summary                                          |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [object.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/utils/object.tsx) | HTTP error 401 for prompt `src/utils/object.tsx` |
| [domain.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/utils/domain.tsx) | HTTP error 401 for prompt `src/utils/domain.tsx` |

</details>

<details closed><summary>src.routes</summary>

| File                                                                                                           | Summary                                                 |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [PrivateRoute.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/routes/PrivateRoute.tsx) | HTTP error 401 for prompt `src/routes/PrivateRoute.tsx` |
| [router.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/routes/router.tsx)             | HTTP error 401 for prompt `src/routes/router.tsx`       |
| [PublicRoute.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/routes/PublicRoute.tsx)   | HTTP error 401 for prompt `src/routes/PublicRoute.tsx`  |

</details>

<details closed><summary>src.routes.layouts</summary>

| File                                                                                                                     | Summary                                                          |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [DefaultLayout.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/routes/layouts/DefaultLayout.tsx) | HTTP error 401 for prompt `src/routes/layouts/DefaultLayout.tsx` |

</details>

<details closed><summary>src.pages</summary>

| File                                                                                                    | Summary                                             |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [Error404.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/pages/Error404.tsx)   | HTTP error 401 for prompt `src/pages/Error404.tsx`  |
| [Dashboard.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/pages/Dashboard.tsx) | HTTP error 401 for prompt `src/pages/Dashboard.tsx` |
| [Login.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/pages/Login.tsx)         | HTTP error 401 for prompt `src/pages/Login.tsx`     |

</details>

<details closed><summary>src.pages.Player</summary>

| File                                                                                                             | Summary                                                     |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [PlayerEdit.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/pages/Player/PlayerEdit.tsx) | HTTP error 401 for prompt `src/pages/Player/PlayerEdit.tsx` |
| [Players.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/pages/Player/Players.tsx)       | HTTP error 401 for prompt `src/pages/Player/Players.tsx`    |

</details>

<details closed><summary>src.pages.Character</summary>

| File                                                                                                                      | Summary                                                           |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [Characters.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/pages/Character/Characters.tsx)       | HTTP error 401 for prompt `src/pages/Character/Characters.tsx`    |
| [CharacterEdit.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/pages/Character/CharacterEdit.tsx) | HTTP error 401 for prompt `src/pages/Character/CharacterEdit.tsx` |

</details>

<details closed><summary>src.components</summary>

| File                                                                                                     | Summary                                                |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [helpers.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/helpers.tsx) | HTTP error 401 for prompt `src/components/helpers.tsx` |
| [Sidebar.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/Sidebar.tsx) | HTTP error 401 for prompt `src/components/Sidebar.tsx` |

</details>

<details closed><summary>src.components.Players</summary>

| File                                                                                                                           | Summary                                                               |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| [PlayersTable.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/Players/PlayersTable.tsx)     | HTTP error 401 for prompt `src/components/Players/PlayersTable.tsx`   |
| [NewPlayerForm.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/Players/NewPlayerForm.tsx)   | HTTP error 401 for prompt `src/components/Players/NewPlayerForm.tsx`  |
| [PlayerDetails.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/Players/PlayerDetails.tsx)   | HTTP error 401 for prompt `src/components/Players/PlayerDetails.tsx`  |
| [EditPlayerForm.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/Players/EditPlayerForm.tsx) | HTTP error 401 for prompt `src/components/Players/EditPlayerForm.tsx` |

</details>

<details closed><summary>src.components.AsyncHelper</summary>

| File                                                                                                                                     | Summary                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [StatusAsyncHelper.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/AsyncHelper/StatusAsyncHelper.tsx) | HTTP error 401 for prompt `src/components/AsyncHelper/StatusAsyncHelper.tsx` |

</details>

<details closed><summary>src.components.Sidebar</summary>

| File                                                                                                             | Summary                                                        |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [Sidebar.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/Sidebar/Sidebar.tsx) | HTTP error 401 for prompt `src/components/Sidebar/Sidebar.tsx` |

</details>

<details closed><summary>src.components.WhiteTile</summary>

| File                                                                                                                   | Summary                                                            |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [WhiteTile.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/WhiteTile/WhiteTile.tsx) | HTTP error 401 for prompt `src/components/WhiteTile/WhiteTile.tsx` |

</details>

<details closed><summary>src.components.Login</summary>

| File                                                                                                                         | Summary                                                             |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [LoginComponent.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/Login/LoginComponent.tsx) | HTTP error 401 for prompt `src/components/Login/LoginComponent.tsx` |

</details>

<details closed><summary>src.components.UI.Spinner</summary>

| File                                                                                                                | Summary                                                           |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [Spinner.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/UI/Spinner/Spinner.tsx) | HTTP error 401 for prompt `src/components/UI/Spinner/Spinner.tsx` |

</details>

<details closed><summary>src.components.UI.Select</summary>

| File                                                                                                                                     | Summary                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [RpgSystemSelection.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/UI/Select/RpgSystemSelection.tsx) | HTTP error 401 for prompt `src/components/UI/Select/RpgSystemSelection.tsx` |
| [CustomSelection.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/UI/Select/CustomSelection.tsx)       | HTTP error 401 for prompt `src/components/UI/Select/CustomSelection.tsx`    |

</details>

<details closed><summary>src.components.UI.Buttons</summary>

| File                                                                                                                          | Summary                                                                |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [DeleteButton.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/UI/Buttons/DeleteButton.tsx) | HTTP error 401 for prompt `src/components/UI/Buttons/DeleteButton.tsx` |

</details>

<details closed><summary>src.components.UI.CustomStyles</summary>

| File                                                                                                                               | Summary                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [CustomStyles.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/UI/CustomStyles/CustomStyles.tsx) | HTTP error 401 for prompt `src/components/UI/CustomStyles/CustomStyles.tsx` |

</details>

<details closed><summary>src.components.Characters</summary>

| File                                                                                                                                    | Summary                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [CharacterDetails.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/Characters/CharacterDetails.tsx)   | HTTP error 401 for prompt `src/components/Characters/CharacterDetails.tsx`  |
| [NewCharacterForm.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/Characters/NewCharacterForm.tsx)   | HTTP error 401 for prompt `src/components/Characters/NewCharacterForm.tsx`  |
| [EditCharacterForm.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/Characters/EditCharacterForm.tsx) | HTTP error 401 for prompt `src/components/Characters/EditCharacterForm.tsx` |
| [CharactersTable.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/components/Characters/CharactersTable.tsx)     | HTTP error 401 for prompt `src/components/Characters/CharactersTable.tsx`   |

</details>

<details closed><summary>src.api</summary>

| File                                                                                                        | Summary                                              |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [items.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/api/items.tsx)               | HTTP error 401 for prompt `src/api/items.tsx`        |
| [authenticate.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/api/authenticate.tsx) | HTTP error 401 for prompt `src/api/authenticate.tsx` |
| [series.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/api/series.tsx)             | HTTP error 401 for prompt `src/api/series.tsx`       |
| [players.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/api/players.tsx)           | HTTP error 401 for prompt `src/api/players.tsx`      |
| [tags.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/api/tags.tsx)                 | HTTP error 401 for prompt `src/api/tags.tsx`         |
| [rpgSystems.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/api/rpgSystems.tsx)     | HTTP error 401 for prompt `src/api/rpgSystems.tsx`   |
| [characters.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/api/characters.tsx)     | HTTP error 401 for prompt `src/api/characters.tsx`   |

</details>

<details closed><summary>src.api.utils</summary>

| File                                                                                                | Summary                                             |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [types.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/api/utils/types.tsx) | HTTP error 401 for prompt `src/api/utils/types.tsx` |
| [api.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/api/utils/api.tsx)     | HTTP error 401 for prompt `src/api/utils/api.tsx`   |

</details>

<details closed><summary>src.api.utils.ResponseSchema</summary>

| File                                                                                                                                   | Summary                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [responseSchemas.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/api/utils/ResponseSchema/responseSchemas.tsx) | HTTP error 401 for prompt `src/api/utils/ResponseSchema/responseSchemas.tsx` |

</details>

<details closed><summary>src.hooks</summary>

| File                                                                                                                    | Summary                                                     |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [useModalProps.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/hooks/useModalProps.tsx)         | HTTP error 401 for prompt `src/hooks/useModalProps.tsx`     |
| [usePageParams.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/hooks/usePageParams.tsx)         | HTTP error 401 for prompt `src/hooks/usePageParams.tsx`     |
| [usePersistedState.tsx](https://github.com/Gamber-github/admin-gospodaWiki/blob/master/src/hooks/usePersistedState.tsx) | HTTP error 401 for prompt `src/hooks/usePersistedState.tsx` |

</details>

## 🛠 Project Roadmap

- [x] `► Authentication`
- [x] `► Default view`
- [x] `► Connection to API`
- [ ] `► Working workflow`
- [ ] `► Hosting`
- [ ] `► Continues managing`

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/Gamber-github/admin-gospodaWiki/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/Gamber-github/admin-gospodaWiki/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/Gamber-github/admin-gospodaWiki/issues)**: Submit bugs found or log feature requests for Admin-gospodawiki.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/Gamber-github/admin-gospodaWiki
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## 👏 Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---
