function toggleViewPassword($input, $button) {
  const icon = $($button.children()[0]);
  $input.attr('type', 'text');
  icon.removeClass('fa-eye-slash')
  icon.addClass('fa-eye');
}

function toggleHidePassword($input, $button) {
  const icon = $($button.children()[0]);
  $input.attr('type', 'password');
  icon.removeClass('fa-eye')
  icon.addClass('fa-eye-slash');
}

$(document).ready(() => {
  $('#password-toggle').on('click', () => {
    if ($('#password').attr('type') === 'password') {
      toggleViewPassword($('#password'), $('#password-toggle'));
    }
    else {
      toggleHidePassword($('#password'), $('#password-toggle'))
    }
  });

  $('#confirm-password-toggle').on('click', () => {
    if ($('#confirm-password').attr('type') === 'password') {
      toggleViewPassword($('#confirm-password'), $('#confirm-password-toggle'));
    }
    else {
      toggleHidePassword($('#confirm-password'), $('#confirm-password-toggle'))
    }
  });
});
