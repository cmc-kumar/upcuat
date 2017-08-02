<script type="text/javascript">
  $("username").focus();

  function validateForm(form) {
  return validateRequired(form);
  }

function required () {
  this.aa = new Array("username", "<fmt:message key="login.errors.required"><fmt:param><fmt:message key="login.username"/></fmt:param></fmt:message>", new Function ("varName", " return this[varName];"));
  this.ab = new Array("password", "<fmt:message key="login.errors.required"><fmt:param><fmt:message key="login.password"/></fmt:param></fmt:message>", new Function ("varName", " return this[varName];"));
  }
</script>
