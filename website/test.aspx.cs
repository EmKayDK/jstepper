using System;

public partial class test : System.Web.UI.Page {

	public string strJqueryVersion;

	protected void Page_Load(object sender, EventArgs e) {

		strJqueryVersion = Request.QueryString["jq"];
		
		if (strJqueryVersion == null) {
			strJqueryVersion = "2.1.3";
		}

	}

}