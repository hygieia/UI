import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Terraform {
	States : any =  {
		
		"PLANNING": {
			Color : "#00ff00"
		},
		
		"NEEDS CONFIRMATION": {
			Color : "#ffff66"
		},
		
		"COST ESTIMATING": {
			Color : "#66ff33"
		},
		
		"COST ESTIMATED": {
			Color : "#00ff99"
		},
		
		"POLICY CHECK": {
			Color : "#e6e600"
		},
		
		"POLICY OVERRIDE": {
			Color : "#666600"
		},
		
		"POLICY CHECKED": {
			Color : "#4d4d00"
		},
		
		"APPLYING": {
			Color : "#333300"
		},
		
		"APPLIED": {
			Color : "#39ac73"
		},
		
		"NO CHANGES": {
			Color : "#73e600"
		},
		
		"APPLY ERRORED": {
			Color : "#59b300"
		},
		
		"PLAN ERRORED": {
			Color : "#408000"
		},
		
		"DISCARDED": {
			Color : "#1a3300"
		},
		
		"CANCELED": {
			Color : "#a6ff4d"
		},
		
		"ERRORED": {
			color : "#cc9900"
		}
		
		
		
	}
}
