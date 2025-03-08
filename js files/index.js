var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var addBtn = document.getElementById("addBtn");

var siteNamePattren = /\w{3,}/i;
var siteUrlPattren = /https?:\/\/(xwww.)?\w+.\w+/i;

var sitesContainer = document.getElementById("sitesContainer");

var sitesList = [];
if (localStorage.getItem("sites")) {
  sitesList = JSON.parse(localStorage.getItem("sites"));
  display();
}
function addSite() {
  if (
    !siteNamePattren.test(siteName.value) ||
    !siteUrlPattren.test(siteUrl.value)
  ) {
    document.getElementById("alertWindow").classList.remove("d-none");
    document.getElementById("alertWindow").classList.add("d-flex");
  } else {
    var site = {
      name: siteName.value,
      url: siteUrl.value,
    };

    sitesList.push(site);

    clearInput();
    display();

    localStorage.setItem("sites", JSON.stringify(sitesList));
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
  }
}
function clearInput() {
  siteName.value = "";
  siteUrl.value = "";
}
function display() {
  var container = "";
  for (var i = 0; i < sitesList.length; i++) {
    container += `
    <tr class="site row py-2">
            <td class="col text-center f-primary-color f-main">${i + 1}</td>
            <td class="col text-center f-primary-color f-main">${
              sitesList[i].name
            }</td>
            <td class="col text-center">
              <button id="visitBtn">
                <a
                  href="${sitesList[i].url}"
                  target="_blank"
                  class="text-decoration-none f-four-color"
                  ><i class="fa-solid fa-eye"></i> Visit</a
                >
              </button>
            </td>
            <td class="col text-center">
              <button id = "delBtn" onclick="deleteSite(${i})" class="f-four-color bg-danger">
                <i class="fa-solid fa-trash-can"></i> Delete
              </button>
            </td>
          </tr>

    `;
  }
  sitesContainer.innerHTML = container;
}
function deleteSite(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger mx-2",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        sitesList.splice(index, 1);
        localStorage.setItem("sites", JSON.stringify(sitesList));
        display();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}
function closeAlertMessage() {
  document.getElementById("alertWindow").classList.remove("d-flex");
  document.getElementById("alertWindow").classList.add("d-none");
}
function valdiationForm(ele) {
  var regex = {
    siteName: /\w{3,}/i,
    siteUrl: /https?:\/\/(xwww.)?\w+.\w+/i,
  };

  if (regex[ele.id].test(ele.value)) {
    ele.classList.remove("is-invalid");
    ele.classList.add("is-valid");
  } else if (ele.value == "") {
    ele.classList.remove("is-invalid");
    ele.classList.remove("is-valid");
  } else {
    ele.classList.add("is-invalid");
  }
}
