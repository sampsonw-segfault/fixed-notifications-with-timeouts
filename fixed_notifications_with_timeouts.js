function fixed_notification(){
	this.timeout_id;
	this.notification_id;
	this.notification_object;
	this.notification_content;
	this.allowed_types = ['error', 'notification', 'success', 'warning'];
	this.set_notification = function(message, notification_type, timeout){
		if(timeout % 1 === 0) //integer
		{
			if(this.allowed_types.indexOf(notification_type) >= 0)
			{
				window.clearTimeout(this.timeout_id);
				if(typeof this.notification_id === "undefined" || typeof this.notificaton_object === "undefined" || typeof this.notification_content === "undefined")
				{
					var fnwt_timestamp = new Date().getTime();
					this.notification_id = "fixed_notification_"+fnwt_timestamp;
					document.body.appendChild('<div id="'+this.notification_id+'" class="fnwt_'+notification_type+'"><button type="button" class="fnwt_close">&times;</button><div id="'+this.notification_id+'_content" class="fnwt_notification_content"></div></div>');
					this.notification_object = document.getElementById(this.notification_id);
					this.notification_content = document.getElementById(this.notification_id+'_content');
				}
				
				this.notification_object.className = "fnwt_"+notification_type;
				this.notification_content.appendChild(message+'<br>');
				this.notification_object.style.display = 'block';
				
				this.timeout_id = window.setTimeout(function(){
					this.notification_object.style.display = 'none';
					this.notification_content.innerHTML = "";
				}, timeout);
			}
			else //wrong notification type
			{
				if(console && console.error)
				{
					console.error('fixed_notification: Invalid notification type: "'+notification_type+'"');
				}
			}
		}
		else //timeout not an integer
		{
			if(console && console.error)
			{
				console.error('fixed_notification: Invalid timeout: "'+timeout+'"');
			}
		}
	}
}
