/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>

#import "AppDelegate.h"

int main(int argc, char * argv[]) {
  //for checking all fonts 
  for (NSString* family in [UIFont familyNames])
  {
    NSLog(@"%@", family);
    
    for (NSString* name in [UIFont fontNamesForFamilyName: family])
    {
      NSLog(@"  %@", name);
    }
  }
  
  @autoreleasepool {
    return UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
  }

  
}

