📢 Use this project, [contribute](https://github.com/{OrganizationName}/{AppName}) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# first-purchase-popup

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

This component renders a popup indicating the customer a discount if they register their email. If the email is already registered, it will display a message indicating that to the customer. If it isn't the email will be added to the database throught graphql.

If the customer closes the popup it won't appear again.

![image](https://user-images.githubusercontent.com/62782975/177824724-a134b67d-e000-4bcf-87f9-9f4eed7f564d.png)


## Configuration 

In order to use this component you must:

1. Add the dependency `"itgloberspartnercl.first-purchase-popup": "0.x"` to `manifest.json`;
2. Declare the block `first-purchase-popup`.

### `first-purchase-popup` props

``` 
"first-purchase-popup": 
  {
     "props": 
        {
           "backgroundImage": "assets/popup/popup.png",
           "popupText": "Share your Email and get 15% off"
        }
    } 
 ```

| Prop name    | Type            | Description    | Default value                                                                                                                               |
| ------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | 
| `backgroundImage`      | `string`       | background for the popup        | `XXXXXX`        |
| `popupText`      | `string`       | promotion text        | `XXXXXX`        |




## Customization
Custom css style must be done in the file `itgloberspartnercl.first-purchase-popup.css`

| CSS Handles |
| ----------- | 
| `submit__button` | 
| `message` | 
| `close__button` | 
| `main__container` | 
| `form__container` |
| `text` |


If there are none, add the following sentence instead:

`No CSS Handles are available yet for the app customization.`

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->

---- 

Check out some documentation models that are already live: 
- [Breadcrumb](https://github.com/vtex-apps/breadcrumb)
- [Image](https://vtex.io/docs/components/general/vtex.store-components/image)
- [Condition Layout](https://vtex.io/docs/components/all/vtex.condition-layout@1.1.6/)
- [Add To Cart Button](https://vtex.io/docs/components/content-blocks/vtex.add-to-cart-button@0.9.0/)
- [Store Form](https://vtex.io/docs/components/all/vtex.store-form@0.3.4/)
