# Karigar Mobile Proguard Rules
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class com.karigar.mobile.** { *; }

