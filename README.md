comingohstrolls
===============
<p>A simple jQuery smooth scroll plugin, released under the MIT License.<br>
Compatible with: jQuery 1.4+ in Firefox, Safari, Chrome, Opera, Internet Explorer 7+</p>
<h2>Features</h2>
<ul>
  <li>Friendly, comingohstrolls use anchor as target, if the script not working, it will work just fine.</li>
  <li>Lightweight, less than 1KB(minified and gzipped).</li>
  <li>A responsive menu.</li>
  <li>Update the plugin settings any time.</li>
  <li>Deactivate the plugin any time.</li>
  <li>Customizable.</li>
</ul>
<h2>Usage</h2>
<p>comingohstrolls accepts settings from an object of key/value pairs, and can be assigned to any &lt;a&gt; element.</p>
<pre>$(selector).comingohstrolls(method, options);</pre>

<h2>Methods</h2>
<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>init</th>
      <td>Initialization method. if not set a method, it will call init method.</td>
    </tr>
    <tr>
      <th>destroy</th>
      <td>Deactivate the plugin entity.</td>
    </tr>
    <tr>
      <th>update</th>
      <td>update the plugin entity settings.</td>
    </tr>
  </tbody>
</table>
<h2>Settings</h2>
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>target</th>
      <td>null</td>
      <td>Selector(unique), if not set, it will use href as target, set '#' it will scroll to top.</td>
    </tr>
    <tr>
      <th>easing</th>
      <td>swing</td>
      <td>easing method, support easing plugin.</td>
    </tr>
    <tr>
      <th>duration</th>
      <td>500</td>
      <td>animate duration, unit: milliseconds.</td>
    </tr>
    <tr>
      <th>response</th>
      <td>false</td>
      <td>response on scrolling, type: boolean.</td>
    </tr>
    <tr>
      <th>active</th>
      <td>comingohstrolls</td>
      <td>a class name will add on the current menu item, only when response is true.</td>
    </tr>
    <tr>
      <th>parent</th>
      <td>ul</td>
      <td>match parent element, only when response is true.</td>
    </tr>
    <tr>
      <th>callback</th>
      <td>null</td>
      <td>a callback function after scroll.</td>
    </tr>
  </tbody>
</table>
<p>You can also change the default plugin settings.</p>
<pre class="prettyprint linenums">$.fn.comingohstrolls.defaults = {
	target: &quot;&quot;,
	easing: &quot;swing&quot;,
	duration: 500,
	response: false,
	active: &quot;comingohstrolls&quot;,
	parent: &quot;ul&quot;,
	callback: &quot;&quot;
}</pre>

<h2 id="changelog">Changelog</h2>
<h3>Version 0.3 - 2013/06/20</h3>
<p>Updated manifest file, fixed parent element match bug.</p>
