const author = `
    <!--

        Create with Semi Generator |
        ezzabuzaid |
        email: ezzabuzaid@hotmail.com |

    -->
`

module.exports.wrap = (content) => {
    return `
  <div class="container">
    <div class="row">
        <div class="col-lg-9 col-12"> 
            ${content}
         </div>
    </div>
</div>`
};

module.exports.formWrapper = (content, title) => {
    return `
    <semi-form (submit)="post()">
        <div form-header>${title}</div>
        <div form-body>
            ${content}
        </div>
    </semi-form>
    `
}
