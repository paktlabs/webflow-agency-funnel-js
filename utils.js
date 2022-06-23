function bake_cookie(name, value) {
  let cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}

function read_cookie(name) {
  let result = document.cookie.match(new RegExp(name + '=([^;]+)'));
  result && (result = JSON.parse(result[1]));
  return result;
}

function build_params(params) {
  let result = "";
  let keys = Object.keys(params);
  for (const k of keys) {
    result += k + "=" + params[k] + "&";
  }
  result = result.slice(0, -1);
  return result;
}

function get_cookied_url_params(cookieName) {

  let cookieVal = read_cookie(cookieName);
  if(cookieVal === null || Object.keys(cookieVal).length == 0) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let entries = urlParams.entries();
    let obj = {};
    for(const entry of entries) {
      obj[entry[0]] = entry[1];
    }
    bake_cookie(cookieName, obj);
    cookieVal = obj;
  }
  return build_params(cookieVal);
}

function update_common_links(cookieName) {
  let linkIds = ["navQuoteLink", "faqLink", "claimsLink", "accountLink", "paktLink", "do317Link", "legalLink", "tosLink", "privacyLink", "claimsFooter", "homeFooter", "do317Footer", "fileClaimFooter"];
  let trackParams = "?" + get_cookied_url_params(cookieName);
  for (const linkId of linkIds ) {
    let link = document.getElementById(linkId);
    if(link) {
      link.href += trackParams;
    }
  }
}
