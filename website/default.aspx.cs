
public partial class _default : System.Web.UI.Page {
	
	public string GetTestScript() {

		string strTestScript = Request.Form["txtScript"];

		if (strTestScript == null) {
			strTestScript = "$('#txtTesting').jStepper({minValue:0, maxValue:23, minLength:2});";
		}

		return strTestScript;

	}

	public string GetTestScriptTag() {

		return "<script type=\"text/javascript\">$(document).ready(function() {" + GetTestScript() + "});</script>";

	}

}