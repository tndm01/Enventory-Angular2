<%@ Control Language="C#" EnableViewState="false" AutoEventWireup="false" Inherits="CKFinder.Settings.ConfigFile" %>
<%@ Import Namespace="CKFinder.Settings" %>
<script runat="server">

    /**
	 * This function must check the user session to be sure that he/she is
	 * authorized to upload and access files using CKFinder.
	 */
    public override bool CheckAuthentication()
    {
        return true;
    }
  
    public override void SetConfig()
    {
        LicenseName = "CuongSuperViu";
        LicenseKey = "RBGG5UP473LD33MPTGKPKLSUR8M17JLX";
        BaseUrl = "/data/upload";
        BaseDir = HttpContext.Current.Server.MapPath("~/data/upload");
        Plugins = new string[] {
            "CKFinder.Plugins.FileEditor, CKFinder_FileEditor",
            "CKFinder.Plugins.ImageResize, CKFinder_ImageResize",
            "CKFinder.Plugins.Watermark, CKFinder_Watermark"
        };
        PluginSettings = new Hashtable();
        PluginSettings.Add("ImageResize_smallThumb", "90x90" );
        PluginSettings.Add("ImageResize_mediumThumb", "120x120" );
        PluginSettings.Add("ImageResize_largeThumb", "180x180" );
        Thumbnails.Url = BaseUrl + "/_thumbs/";
        if ( BaseDir != "" ) {
            Thumbnails.Dir = BaseDir + "/_thumbs/";
        }
        Thumbnails.Enabled = true;
        Thumbnails.DirectAccess = true;
        Thumbnails.MaxWidth = 200;
        Thumbnails.MaxHeight = 200;
        Thumbnails.Quality = 80;
        Images.MaxWidth = 1600;
        Images.MaxHeight = 1200;
        Images.Quality = 80;
        CheckSizeAfterScaling = true;
        DisallowUnsafeCharacters = true;
        CheckDoubleExtension = true;
        ForceSingleExtension = true;
        HtmlExtensions = new string[] { "html", "htm", "xml", "js" };
        HideFolders = new string[] { ".*", "CVS" };
        HideFiles = new string[] { ".*" };
        SecureImageUploads = true;
        EnableCsrfProtection = true;
        RoleSessionVar = "CKFinder_UserRole";
        AccessControl acl = AccessControl.Add();
        acl.Role = "*";
        acl.ResourceType = "*";
        acl.Folder = "/";

        acl.FolderView = true;
        acl.FolderCreate = true;
        acl.FolderRename = true;
        acl.FolderDelete = true;

        acl.FileView = true;
        acl.FileUpload = true;
        acl.FileRename = true;
        acl.FileDelete = true;
    
        DefaultResourceTypes = "";

        ResourceType type;

        type = ResourceType.Add( "Files" );
        type.Url = BaseUrl + "/files/";
        type.Dir = BaseDir == "" ? "" : BaseDir + "/files/";
        type.MaxSize = 0;
        type.AllowedExtensions = new string[] { "7z", "aiff", "asf", "avi", "bmp", "csv", "doc", "docx", "fla", "flv", "gif", "gz", "gzip", "jpeg", "jpg", "mid", "mov", "mp3", "mp4", "mpc", "mpeg", "mpg", "ods", "odt", "pdf", "png", "ppt", "pptx", "pxd", "qt", "ram", "rar", "rm", "rmi", "rmvb", "rtf", "sdc", "sitd", "swf", "sxc", "sxw", "tar", "tgz", "tif", "tiff", "txt", "vsd", "wav", "wma", "wmv", "xls", "xlsx", "zip" };
        type.DeniedExtensions = new string[] { };

        type = ResourceType.Add( "Images" );
        type.Url = BaseUrl + "/images/";
        type.Dir = BaseDir == "" ? "" : BaseDir + "/images/";
        type.MaxSize = 0;
        type.AllowedExtensions = new string[] { "bmp", "gif", "jpeg", "jpg", "png" };
        type.DeniedExtensions = new string[] { };

        type = ResourceType.Add( "Flash" );
        type.Url = BaseUrl + "/flash/";
        type.Dir = BaseDir == "" ? "" : BaseDir + "flash/";
        type.MaxSize = 0;
        type.AllowedExtensions = new string[] { "swf", "flv" };
        type.DeniedExtensions = new string[] { };
    }

</script>
